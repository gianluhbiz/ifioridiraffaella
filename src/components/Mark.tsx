export default function Mark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="text-[22px] tracking-[-0.02em]">I fiori</span>
      <span className="mt-1 text-[13px] font-medium tracking-[0.08em] text-muted">di Raffaella</span>
    </span>
  )
}
