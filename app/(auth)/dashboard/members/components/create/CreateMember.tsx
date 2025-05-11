import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "@/app/(auth)/dashboard/members/components/DialogForm";
import CreateForm from "@/app/(auth)/dashboard/members/components/create/CreateForm";
import '@/app/dashboard/members/styles/styles.css'

export default function CreateMember() {
	return (
		<DailogForm
			id="create-trigger"
			title="Create Member"
			Trigger={<Button variant="outline">Create+</Button>}
			form={<CreateForm />}
		/>
	);
}