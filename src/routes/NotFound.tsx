import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/Button';
import { Page } from '@/components/Page';

export function NotFound() {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-2xl m-4">
          <h1 className="mb-6 text-4xl font-extrabold">404: Page Not Found</h1>

          <p>We couldn&apos;t find the page you are looking for.</p>
          <p>Here are some helpful links instead:</p>

          <ul className="mt-4" role="list">
            <li className="my-1">
              <Button
                Icon={HomeIcon}
                href="/"
              >
                Home
              </Button>
            </li>
            <li className="my-1">
              <Button
                Icon={Cog6ToothIcon}
                href="/settings"
              >
                Settings
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </Page>
  );
}
