import React, { ReactNode } from "react";
import SideNav from "@/app/(auth)/dashboard/components/SideNav";
import ToggleSidebar from "@/app/(auth)/dashboard/components/ToggleSidebar";
import MobileSideNav from "@/app/(auth)/dashboard/components/MobileSideNav";
import { readUserSession } from "@/utils/actions";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
	const { data: userSession } = await readUserSession();

	if (!userSession.session) {
		return redirect("/auth");
	}
	return (
		<div className="w-full flex ">
			<div className="h-screen flex flex-col">
				<SideNav />
				<MobileSideNav />
			</div>

			<div className="w-full sm:flex-1 p-5 sm:p-10 space-y-5 bg-gray-100 dark:bg-inherit">
				<ToggleSidebar />
				{children}
			</div>
		</div>
	);
}