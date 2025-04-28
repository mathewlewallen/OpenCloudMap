
type SeparatorWithTextProps = {
  leftBorderProps?: React.HTMLAttributes<HTMLDivElement>
  rightBorderProps?: React.HTMLAttributes<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>

export default function SeparatorWithText({
  children,
  leftBorderProps,
  rightBorderProps,
  ...props
}: SeparatorWithTextProps) {
  return (
    <div className="relative flex items-center" {...props}>
      <div className="grow border-t border-foreground-muted" {...leftBorderProps}></div>
      <span className="shrink mx-4">{children}</span>
      <div className="grow border-t border-foreground-muted" {...rightBorderProps}></div>
    </div>
  )
}
