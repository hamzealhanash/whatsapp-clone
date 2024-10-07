import Logo from "/src/assets/Logo.svg"
import SignIn from "@/Pages/sign/in/Signin.tsx";

export const Sign = () => {
    return (
            <div className="w-full h-full bg-white">
                <div className="absolute top-0 left-0 h-1/3 w-full bg-teal-600">
                    <div className="items relative top-4 left-4 flex gap-2 items-center">
                        <img src={Logo} className="h-10" alt="logo"/>
                        <h6 className="text-white font-medium text-2xl -left-">Whatsapp</h6>
                    </div>
                </div>
                <div className="w-full h-full top-0 left-0 absolute bg-black opacity-40 z-10"></div>
                <SignIn/>
            </div>
    );
};