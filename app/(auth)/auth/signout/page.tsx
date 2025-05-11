import { LogoutButton } from "@/components/logout-button";
import { readUserSession } from "@/utils/actions";
import React from "react";
import { redirect } from "next/navigation";

export default async function page() {

        const { data: userSession } = await readUserSession();

        if (!userSession.session) {
                return redirect("/");
        }

    return (
          <div className="container px-4 py-8 items-centered">
          <div className="mt-6">
                          <h1 className="text-2xl text-center font-semibold tracking-tight mb-4">Sign out of Onyx</h1>
            <LogoutButton/>
</div>
</div>
    )
        
}