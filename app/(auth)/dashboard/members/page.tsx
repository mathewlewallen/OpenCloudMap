import React from "react";
import MemberTable from "@/app/(auth)/dashboard/members/components/MemberTable";
import SearchMembers from "@/app/(auth)/dashboard/members/components/SearchMembers";
import CreateMember from "@/app/(auth)/dashboard/members/components/create/CreateMember";

export default function Members() {
	return (
		<div className="space-y-5 w-full overflow-y-auto px-3">
			<h1 className="text-3xl font-bold">Members</h1>
			<div className="flex gap-2">
				<SearchMembers />
				<CreateMember />
			</div>
			<MemberTable />
		</div>
	);
}