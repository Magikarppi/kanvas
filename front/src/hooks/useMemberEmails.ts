import { useState } from "react";

export default function useMemberEmails(initialMembers: string[]) {
    const [memberEmails, setMemberEmails] = useState<string[]>(initialMembers);

    const addMemberEmail = (memberEmail: string) => {
        setMemberEmails([...memberEmails, memberEmail]);
    };

    const deleteMemberEmail = (emailToDelete: string) => {
        const updatedMemberEmails = memberEmails.filter(
            (email) => email.toLowerCase() !== emailToDelete.toLowerCase()
        );
        setMemberEmails(updatedMemberEmails);
    };

    const resetMemberEmails = () => setMemberEmails([]);

    return {
        memberEmails,
        addMemberEmail,
        deleteMemberEmail,
        resetMemberEmails,
    };
}
