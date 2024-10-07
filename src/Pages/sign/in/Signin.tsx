import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import zod from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

const formSchema = zod.object({
    phoneNumber: zod.string().length(10, {message: "your phone number must be 10 digits"}),
    username: zod.string().min(2).max(50),
})
export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            username: "",
        },
    })

    const onSubmit = (values: zod.infer<typeof formSchema>) => {
        setIsLoading(true)
        console.log(values)
    }

    return (
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 absolute  bg-white
                       transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-6 size-1/2 z-20 rounded shadow-2xl ">
                    <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="09** *** ***" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                            )}
                    />
                    <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                            )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
    )
}