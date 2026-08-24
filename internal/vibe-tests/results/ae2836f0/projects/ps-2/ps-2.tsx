import {Theme} from '@astryxdesign/core/Theme';
import {Layout} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export default function RootLayout({children}: {children?: React.ReactNode}) {
  return (
    <Theme theme={neutralTheme}>
      <Layout>
        <Layout.Header>
          <div className="flex items-center px-4 py-2">
            <Text weight="bold" size="lg">Internal Tool</Text>
          </div>
        </Layout.Header>
        <Layout.Content>
          <div className="p-6">
            {children ?? <Text>Welcome to the internal tool.</Text>}
          </div>
        </Layout.Content>
      </Layout>
    </Theme>
  );
}
