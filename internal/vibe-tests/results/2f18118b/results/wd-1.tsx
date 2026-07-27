import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";

type Step = "cart" | "shipping" | "payment" | "confirmation";
export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>("cart");
  const steps: Step[] = ["cart", "shipping", "payment", "confirmation"];
  const idx = steps.indexOf(step);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">{steps.map((s, i) => (<div key={s} className="flex items-center"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${i <= idx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div><span className="ml-2 text-sm capitalize hidden sm:inline">{s}</span>{i < steps.length - 1 && <Separator className="w-8 mx-2" />}</div>))}</div>
      <Card><CardHeader><CardTitle className="capitalize">{step === "cart" ? "Cart Summary" : step}</CardTitle></CardHeader><CardContent>
        {step === "cart" && (<div className="space-y-4"><p className="text-muted-foreground">Review your items.</p><Button onClick={() => setStep("shipping")}>Continue</Button></div>)}
        {step === "shipping" && (<div className="space-y-4"><div><Label htmlFor="name">Full Name</Label><Input id="name" /></div><div><Label htmlFor="addr">Address</Label><Input id="addr" /></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="city">City</Label><Input id="city" /></div><div><Label htmlFor="zip">ZIP</Label><Input id="zip" /></div></div><div className="flex gap-2"><Button variant="outline" onClick={() => setStep("cart")}>Back</Button><Button onClick={() => setStep("payment")}>Continue</Button></div></div>)}
        {step === "payment" && (<div className="space-y-4"><div><Label htmlFor="card">Card</Label><Input id="card" /></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="exp">Exp</Label><Input id="exp" /></div><div><Label htmlFor="cvv">CVV</Label><Input id="cvv" /></div></div><div className="flex gap-2"><Button variant="outline" onClick={() => setStep("shipping")}>Back</Button><Button onClick={() => setStep("confirmation")}>Place Order</Button></div></div>)}
        {step === "confirmation" && (<div className="text-center space-y-2"><p className="text-lg font-semibold">Order Confirmed!</p><p className="text-muted-foreground">Thank you.</p></div>)}
      </CardContent></Card>
    </div>
  );
}
