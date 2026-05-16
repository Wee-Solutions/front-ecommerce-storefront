"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PaginatedSelectionList } from "@/components/ui/paginated-selection-list";
import { useTranslations } from "@/contexts/locale-context";
import { useVendor } from "@/contexts/vendor-context";
import { useCustomerSession } from "@/features/auth/customer-session";
import { getCitySelectionList } from "@/services/configuration.service";
import {
  createCustomerShipmentInfo,
  deleteCustomerShipmentInfo,
  getCustomerShipmentInfos,
  updateCustomerShipmentInfo,
} from "@/services/customers.service";
import type { ShipmentInfo, UpsertShipmentInfoRequest } from "@/types/api/customer";
import { GatewayRequestError } from "@/types/api/gateway";

type ShippingFormState = UpsertShipmentInfoRequest;

const emptyForm: ShippingFormState = {
  cityId: null,
  cityDescription: "",
  street: "",
  streetNumber: "",
  apartmentNumber: "",
  apartmentFloor: "",
  apartmentEnterance: "",
  apartmentEnteranceCode: "",
  additionalEnteranceCode: "",
  addressNotes: "",
  zipCode: "",
  isDefault: false,
};

function fromShipment(info?: ShipmentInfo): ShippingFormState {
  if (!info) return emptyForm;
  return {
    cityId: info.cityId ?? null,
    cityDescription: info.cityDescription ?? "",
    street: info.street ?? "",
    streetNumber: info.streetNumber ?? "",
    apartmentNumber: info.apartmentNumber ?? "",
    apartmentFloor: info.apartmentFloor ?? "",
    apartmentEnterance: info.apartmentEnterance ?? "",
    apartmentEnteranceCode: info.apartmentEnteranceCode ?? "",
    additionalEnteranceCode: info.additionalEnteranceCode ?? "",
    addressNotes: info.addressNotes ?? "",
    zipCode: info.zipCode ?? "",
    isDefault: Boolean(info.isDefault),
  };
}

export function ShippingDetails() {
  const t = useTranslations();
  const { language } = useVendor();
  const { accessToken } = useCustomerSession();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<ShippingFormState>(emptyForm);

  const shipmentInfosQuery = useQuery({
    queryKey: ["customer-shipment-infos", language, accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error("Not authenticated");
      return getCustomerShipmentInfos(accessToken, language);
    },
    enabled: Boolean(accessToken),
  });

  const records = shipmentInfosQuery.data?.records ?? [];
  const activeRecords = records.filter((record) => record.isActive);
  const editingRecord = records.find((record) => record.id === editingId);
  const hasReachedShippingLimit = activeRecords.length >= 3;

  const createMutation = useMutation({
    mutationFn: async (payload: UpsertShipmentInfoRequest) => {
      if (!accessToken) throw new Error("Not authenticated");
      return createCustomerShipmentInfo(payload, accessToken, language);
    },
    onSuccess: async () => {
      const txt = t.account.shippingSaved;
      setMessage(txt);
      toast.success(txt);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await shipmentInfosQuery.refetch();
    },
    onError: (e: unknown) => {
      const txt =
        e instanceof GatewayRequestError ? e.message : t.account.shippingSaveFailed;
      setMessage(txt);
      toast.error(txt);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      shipmentInfoId,
      payload,
      isActive,
    }: {
      shipmentInfoId: string;
      payload: UpsertShipmentInfoRequest;
      isActive: boolean;
    }) => {
      if (!accessToken) throw new Error("Not authenticated");
      return updateCustomerShipmentInfo(
        shipmentInfoId,
        { ...payload, isActive },
        accessToken,
        language,
      );
    },
    onSuccess: async () => {
      const txt = t.account.shippingUpdated;
      setMessage(txt);
      toast.success(txt);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await shipmentInfosQuery.refetch();
    },
    onError: (e: unknown) => {
      const txt =
        e instanceof GatewayRequestError ? e.message : t.account.shippingUpdateFailed;
      setMessage(txt);
      toast.error(txt);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (shipmentInfoId: string) => {
      if (!accessToken) throw new Error("Not authenticated");
      return deleteCustomerShipmentInfo(shipmentInfoId, accessToken, language);
    },
    onSuccess: async () => {
      const txt = t.account.shippingDeleted;
      setMessage(txt);
      toast.success(txt);
      if (editingId) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
      }
      await shipmentInfosQuery.refetch();
    },
    onError: (e: unknown) => {
      const txt =
        e instanceof GatewayRequestError ? e.message : t.account.shippingDeleteFailed;
      setMessage(txt);
      toast.error(txt);
    },
  });

  const isBusy =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const citySeedOption = useMemo(() => {
    if (!form.cityId) return null;
    return {
      id: form.cityId,
      name: form.cityDescription || form.cityId,
    };
  }, [form.cityDescription, form.cityId]);

  const fetchCityPage = useCallback(
    (params: { searchTerm?: string; take: number; skip: number }) => {
      if (!accessToken) {
        return Promise.resolve({ records: [], totalCount: 0 });
      }
      return getCitySelectionList(params, accessToken, language);
    },
    [accessToken, language],
  );

  const hasCity = Boolean(form.cityId || form.cityDescription.trim());
  const canSubmit = Boolean(form.street.trim() && hasCity);

  function startEdit(record: ShipmentInfo) {
    setShowForm(true);
    setEditingId(record.id);
    setForm(fromShipment(record));
  }

  function startCreate() {
    if (hasReachedShippingLimit) {
      const txt = t.account.shippingMaxReached;
      setMessage(txt);
      toast.error(txt);
      return;
    }
    setShowForm(true);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!hasCity) {
      const txt = t.account.shippingCityRequired;
      setMessage(txt);
      toast.error(txt);
      return;
    }
    const payload: UpsertShipmentInfoRequest = {
      cityId: form.cityId || null,
      cityDescription: form.cityDescription.trim(),
      street: form.street.trim(),
      streetNumber: form.streetNumber.trim(),
      apartmentNumber: form.apartmentNumber.trim(),
      apartmentFloor: form.apartmentFloor.trim(),
      apartmentEnterance: form.apartmentEnterance.trim(),
      apartmentEnteranceCode: form.apartmentEnteranceCode.trim(),
      additionalEnteranceCode: form.additionalEnteranceCode.trim(),
      addressNotes: form.addressNotes.trim(),
      zipCode: form.zipCode.trim(),
      isDefault: form.isDefault,
    };

    if (editingId && editingRecord) {
      await updateMutation.mutateAsync({
        shipmentInfoId: editingId,
        payload,
        isActive: editingRecord.isActive,
      });
      return;
    }

    if (hasReachedShippingLimit) {
      const txt = t.account.shippingMaxReached;
      setMessage(txt);
      toast.error(txt);
      return;
    }

    await createMutation.mutateAsync(payload);
  }

  if (!accessToken) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">{t.account.signedOut}</p>
          <a href="/login" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            {t.account.signedOutCta}
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-sans">{t.account.shippingDetails}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={startCreate}
            disabled={hasReachedShippingLimit && !editingId}
          >
            {t.account.shippingAddNew}
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {hasReachedShippingLimit ? (
            <p className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
              {t.account.shippingMaxReached}
            </p>
          ) : null}
          {shipmentInfosQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">{t.orders.loading}</p>
          ) : activeRecords.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
              {t.account.shippingEmpty}
            </p>
          ) : (
            activeRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border/60 px-4 py-3"
              >
                <div className="space-y-1 text-sm">
                  <p className="font-medium">
                    {[record.cityDescription, record.street, record.streetNumber]
                      .filter(Boolean)
                      .join(", ")}
                    {record.isDefault ? ` (${t.account.shippingDefaultTag})` : ""}
                  </p>
                  <p className="text-muted-foreground">
                    {[record.apartmentFloor, record.apartmentNumber, record.zipCode]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(record)}
                  >
                    {t.account.edit}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isBusy}
                    onClick={() => {
                      if (!window.confirm(t.account.shippingDeleteConfirm)) return;
                      deleteMutation.mutate(record.id);
                    }}
                  >
                    {t.account.shippingDelete}
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">
              {editingId
                ? t.account.shippingEditTitle
                : t.account.shippingAddTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingCity}</label>
                <PaginatedSelectionList
                  allowCustom
                  value={form.cityId ?? null}
                  customValue={form.cityId ? null : form.cityDescription}
                  label={form.cityId ? form.cityDescription || undefined : undefined}
                  seedOption={citySeedOption}
                  queryKey={["city-selection", language, accessToken]}
                  fetchPage={fetchCityPage}
                  placeholder={t.account.shippingCityPlaceholder}
                  searchPlaceholder={t.account.shippingCitySearchPlaceholder}
                  emptyLabel={t.account.shippingCityEmpty}
                  loadingLabel={t.account.shippingCityLoading}
                  formatCustomLabel={(term) =>
                    t.account.shippingCityUseCustom.replace("{term}", term)
                  }
                  disabled={isBusy}
                  onChange={(cityId, item) =>
                    setForm((v) => ({
                      ...v,
                      cityId,
                      cityDescription: item?.name ?? v.cityDescription,
                    }))
                  }
                  onCustomSelect={(term) =>
                    setForm((v) => ({
                      ...v,
                      cityId: null,
                      cityDescription: term,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingZipCode}</label>
                <Input
                  value={form.zipCode}
                  onChange={(e) => setForm((v) => ({ ...v, zipCode: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingStreetRequired}</label>
                <Input
                  value={form.street}
                  onChange={(e) => setForm((v) => ({ ...v, street: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingStreetNumber}</label>
                <Input
                  value={form.streetNumber}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, streetNumber: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingApartmentNumber}</label>
                <Input
                  value={form.apartmentNumber}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, apartmentNumber: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingApartmentFloor}</label>
                <Input
                  value={form.apartmentFloor}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, apartmentFloor: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingEntrance}</label>
                <Input
                  value={form.apartmentEnterance}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, apartmentEnterance: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.account.shippingEntranceCode}</label>
                <Input
                  value={form.apartmentEnteranceCode}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, apartmentEnteranceCode: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t.account.shippingAdditionalEntranceCode}</label>
              <Input
                value={form.additionalEnteranceCode}
                onChange={(e) =>
                  setForm((v) => ({ ...v, additionalEnteranceCode: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t.account.shippingAddressNotes}</label>
              <Input
                value={form.addressNotes}
                onChange={(e) => setForm((v) => ({ ...v, addressNotes: e.target.value }))}
              />
            </div>

            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm((v) => ({ ...v, isDefault: e.target.checked }))
                }
              />
              {t.account.shippingIsDefault}
            </label>

              <div className="flex gap-2">
                <Button type="submit" disabled={isBusy || !canSubmit}>
                  {editingId ? t.account.shippingUpdate : t.account.shippingSave}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                >
                  {t.account.cancel}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
