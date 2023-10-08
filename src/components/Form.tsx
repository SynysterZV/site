'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-hot-toast"
import { VscSend } from "react-icons/vsc"

import { DISCORD_WEBHOOK } from "@/util/constants"

const schema = z.object({
    name: z.string().max(100).min(3, { message: 'Must be more than 3 characters' }),
    email: z.string().email({ message: "Must be an email" }),
    body: z.string().max(500).min(3, { message: "Must be more than 3 characters" })
})

type Schema = typeof schema._type

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Schema>({
        resolver: zodResolver(schema),
        mode: "onTouched"
    })

    const handler: SubmitHandler<Schema> = async (data) => {
        const res = await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: 'new email',
                embeds: [
                    {
                        description: data.body,
                        author: {
                            name: `${data.name} (${data.email})`
                        }
                    }
                ]
            })
        })

        if(res.status >= 400) toast("Error")
        else toast("Success!")

        return reset()
    }

    const cL = "text-sm font-bold tracking-wide dark:text-white text-opacity-50 uppercase select-none"
    const cI = "block py-1 px-4 w-full font-sans text-lg bg-gray-200 rounded-md foucs:ring focus:outline-none dark:bg-white/5"


    return (
        <form
            className="space-y-2"
            onSubmit={handleSubmit(handler)}
        >
            <label htmlFor="name" className="block">
                <span className={cL}>Name</span>
                <input className={cI} {...register('name', { required: true })}/>
                {errors.name?.message && <p>{String(errors.name?.message)}</p>}
            </label>
            <label htmlFor="email" className="block">
                <span className={cL}>Email</span>
                <input className={cI} {...register('email', { required: true })}/>
                {errors.email?.message && <p>{String(errors.email?.message)}</p>}
            </label>
            <label htmlFor="body" className="block">
                <span className={cL}>Message</span>
                <textarea className={cI} {...register('body', { required: true })} />
                {errors.body?.message && <p>{String(errors.body?.message)}</p>}
            </label>
            <div className="block pt-2">
                <button
                    type="submit"
                    className="inline-flex items-center py-2 px-8 space-x-2 text-lg text-blue-100 dark:text-white bg-blue-700 rounded-full focus:ring foucs:outline-none dark:bg-white/5 dark:hover:bg-white/10"
                >
                    <span>Send</span> <VscSend/>
                </button>
            </div>
        </form>
    )
}