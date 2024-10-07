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
import {Loader2} from "lucide-react";

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

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(values)
        setIsLoading(false)
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
                    <Button type="submit">
                        {isLoading ? (<>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait </>
                        ) : ("Sing in")}
                    </Button>
                </form>
            </Form>
    )
}