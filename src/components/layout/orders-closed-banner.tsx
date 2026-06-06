type Props = {
  message: string;
};

export function OrdersClosedBanner({ message }: Props) {
  return (
    <div
      role="status"
      className="border-b border-amber-200/90 bg-amber-50 px-4 py-2.5 text-center text-sm font-medium text-amber-950"
    >
      {message}
    </div>
  );
}
