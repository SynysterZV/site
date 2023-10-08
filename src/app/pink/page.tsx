import Image from "next/image"

export default function Pink() {
    return (
        <>
            <div className="fixed inset-0 -z-[99] bg-gradient-to-tr from-[#D291BC] to-[#957DAD]"/>
            <Image
                width={374}
                height={498}
                className="ml-[150px]"
                alt="Hello Kitty"
                src="https://static.wikia.nocookie.net/hello-yoshi/images/9/9f/Mymelodyfront2D.png/revision/latest?cb=20191021195635"
            />
        </>
    )
}