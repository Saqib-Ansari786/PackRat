import { Button } from '@packrat/ui/src/shadcn/button';
import Link from 'next/link';
import { getStarted, loginText } from '../../constants';

export function CTANav() {
  return (
    <div className="gap-2 flex">
      <Button variant={'outline'}>{getStarted}</Button>
      <Button className="bg-gradient-to-r from-purple-600 to-red-400 text-black font-bold">
        <Link href={'/login'}>{loginText}</Link>
      </Button>
    </div>
  );
}