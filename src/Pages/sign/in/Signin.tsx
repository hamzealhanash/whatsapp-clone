"use client"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {zodResolver} from "@hookform/resolvers/zod"
import {Loader2, CalendarIcon} from "lucide-react"
import {Calendar} from '@/components/ui/calendar'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useState, useEffect} from 'react'
import {useForm} from "react-hook-form"
import {format} from 'date-fns'
import zod from "zod"


const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/

const formSchema = zod.object({
    phoneNumber: zod.string().length(10, "your phone number must be 10 numbers long").regex(phoneRegex, 'Invalid phone number'),
    username: zod.string().min(2).max(20),
    birthDate: zod.date({
        required_error: 'Please select a date',
    }),
})
export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            username: "",
        }
    })


    function onSubmit(values: zod.infer<typeof formSchema>) {
        const formattedValues = {
            ...values,
            birthDate: {
                day: format(values.birthDate, 'dd'),
                month: format(values.birthDate, 'MM'),
                year: format(values.birthDate, 'yyyy')
            }
        }
        setIsLoading(true)
        setTimeout(() => {
            console.log(formattedValues)
            setIsLoading(false)
        }, 1000)
    }

    const [component, setComponent] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            const module = await import('lucide-react');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setComponent(module.Loader2)
        }
        loadComponent()
    })

    return (
      <Card>
          <CardHeader>
              <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
              <Form {...form}  >
                  <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 absolute bg-white transform -translate-x-1/2 -translate-y-1/2
                       left-1/2 top-1/2 p-40 pt-10 pb-0 size-1/2 w-1/2 z-20 rounded shadow-2xl ">
                      <InputForm control={form.control} name="phoneNumber" label="Phone Number" holder="+1234567890"/>
                      <InputForm control={form.control} name="username" label="User Name" holder="saed"/>
                      <Calender control={form.control}/>

                      <Button className="w-full bottom-0 " type="submit" disabled={isLoading}>
                          {isLoading ? (<>{component && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}Please wait </>
                          ) : ("Sing in")}
                      </Button>
                  </form>
              </Form>
          </CardContent>
      </Card>
    )
}


function InputForm({control, name, label, holder}: {
    control: any,
    name: string,
    label: string,
    holder: string
}) {

    return (
      <FormField
        control={control}
        name={name}
        render={({field}) => (
          <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                  <Input placeholder={holder} {...field} />
              </FormControl>
              <FormMessage/>
          </FormItem>
        )}
      />
    )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Calender({control}) {
    return (<FormField
        control={control}
        name="birthDate"
        render={({field}) => (
          <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                  <PopoverTrigger asChild>
                      <FormControl>
                          <Button
                            variant={'outline'}
                            className={`w-[240px] pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}>
                              {field.value ? (format(field.value, 'dd/MM/yyyy')) : (
                                <span>Pick a date</span>)}
                              <CalendarIcon className="ml-auto h-4 w-4 "/>
                          </Button>
                      </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                      />
                  </PopoverContent>
              </Popover>
              <FormMessage/>
          </FormItem>
        )}
      />
    )
}