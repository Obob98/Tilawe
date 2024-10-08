
import Link from 'next/link';
import Image from 'next/image';
import heroImg from '@/../public/store/heroImg.webp'
import { Button } from '@/tremorComponents/Button';

export default function Home() {
  return (
    <>
      <header className='w-full max-w-[1120px] mx-auto overflow-hidden'>
        <nav className='flex items-center justify-between mt-8 sticky top-4'>
          <Link
            href={"/"}
            className='text-primary font-semibold text-xl '
          >
            Tilawe
          </Link>

          <ul className='flex items-center gap-4'>
            <li className='hover:text-primary text-primary underline'>
              <Link href={"about"}>Home</Link>
            </li>
            <li className='hover:text-primary'>
              <Link href={"about"}>About Us</Link>
            </li>
            <li className='hover:text-primary'>
              <Link href={"about"}>Contact</Link>
            </li>
          </ul>

          <Link
            href="/login"
          >
            <Button variant='secondary' className='bg-transparent px-8 py-4 w-fit h-fit hover:bg-primary hover:text-white ' >
              Log in
            </Button>
          </Link>
        </nav>
        <section className='w-full mt-20 flex items-center justify-between gap-8'>
          <div className='w-full flex-1 flex flex-col gap-2'>
            <h1 className='text-[48px] font-extrabold'>Discover the Difference</h1>
            <p>Fresh, locally sourced cuts for your table.</p>
            {/* <div className=' flex gap-4 flex-col'> */}
            <Button className=' px-8 py-4 w-fit h-fit mt-8'>
              Discover More
            </Button>
            {/* </div> */}
          </div>
          <div className='flex-1 rounded-xl overflow-hidden'>
            <Image
              src={heroImg}
              alt='hero image'
              width={2000}
              height={2000}
              className='aspect-[5/4]'
            />
          </div>
        </section>
      </header>
      <main className="flex min-h-screen flex-col p-6">
      </main>
    </>
  );
}
