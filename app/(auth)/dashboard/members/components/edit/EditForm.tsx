import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicForm from "@/app/(auth)/dashboard/members/components/edit/BasicForm";
import AccountForm from "@/app/(auth)/dashboard/members/components/edit/AccountForm";
import AdvanceForm from "@/app/(auth)/dashboard/members/components/edit/AdvanceForm";
import { cn } from "@/lib/utils";

export default function EditForm() {
	return (
		<Tabs defaultValue="basic" className="w-full space-y-5">
			<TabsList className={cn("grid w-full ", "grid-cols-3")}>
				<TabsTrigger value="basic">Basic</TabsTrigger>

				<TabsTrigger value="account">Acccount</TabsTrigger>
				<TabsTrigger value="advance">Advance</TabsTrigger>
			</TabsList>
			<TabsContent value="basic">
				<BasicForm />
			</TabsContent>

			<TabsContent value="account">
				<AccountForm />
			</TabsContent>
			<TabsContent value="advance">
				<AdvanceForm />
			</TabsContent>
		</Tabs>
	);
}