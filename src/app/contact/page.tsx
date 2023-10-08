import { BsFillChatHeartFill } from "react-icons/bs"

import Form from "@/components/Form"
import { ProfilesList } from "@/components/Profiles"

export default function Contact() {
    return (
        <div className="space-y-4">
            <h1 className="flex text-2xl sm:text-3xl font-bold">
                Contact Me <BsFillChatHeartFill className="ml-3 w-7 h-7"/>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-gray-100 rounded-lg dark:bg-white/5">
                    <Form />
                </div>
                <div>
                    <ProfilesList />
                </div>
            </div>
        </div>
    )
}