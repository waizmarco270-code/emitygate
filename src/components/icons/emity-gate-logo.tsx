import { cn } from "@/lib/utils";

const EmityGateLogo = ({ className }: { className?: string }) => (
  <div className={cn("font-headline text-2xl tracking-wider", className)}>
    <span className="font-bold">EMITY</span>
    <span className="font-light text-primary">GATE</span>
  </div>
);

export default EmityGateLogo;
