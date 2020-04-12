# mayoor frontend

Built on top of `create-react-app`

## Development mode

1. make sure your current working directory is `./frontend`
2. `npm install` - install the dependencies
3. `npm run start` - run app in dev mode
4. 🚀open [http://localhost:3000](http://localhost:3000) to view it in the browser, HMR enabled 🚀
   (the admin user login credentials are username: `admin` password: `admin`)

## Running tests & lints

`npm run test` and `npm run lint`

## Apollo codegen

To have your GraphQL operations properly typed, you have to generate the typescript types via following:

1. add a graphql query the component (preferably to `queries.ts` next to the component file)
2. run `npm run generate:types`
3. import the generated type to your component from `./src/__generated__/types.ts`

## Translations

### Adding a language

1. add a language locale string to `locales` in `./i18next-parser.config.js`
2. add translations JSON import to resources in `./src/i18n.ts`
3. translate the whole JSON to the language you have chosen
4. add/change the languages available to select in `./src/components/LanguageSwitch/LanguageSwitch.tsx`

### Adding a translated string

If you add any text string and you want that string translated, follow these steps:

1. add a translated string to a component, e.g.:

```tsx
import { useTranslation } from 'react-i18next';
...
const { t } = useTranslation();
return <div>{t('This is going to be translated')}</div>
...
```

2. save that file
3. run `npm run extract:translations`
4. if the string wasnt translated yet, it will appear in `./src/locales/cs/translation.json`
