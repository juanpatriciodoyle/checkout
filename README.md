# Vivre Checkout Process 🛍️

![Days](https://img.shields.io/static/v1?label=Working-Days&message=2&color=blue)
![Status](https://img.shields.io/static/v1?label=Done-Status&message=100%&color=green)

This project is a modern, multi-step checkout experience built with React, TypeScript, and styled-components. It demonstrates a sophisticated, user-friendly interface with a focus on modern web technologies and clean coding principles. ✨

## Key Features

-   **Multi-Step Accordion UI 📜**: A sleek, collapsible interface guides the user through the checkout process, including steps for the cart, shipping information, shipping method, and payment.
-   **Step Locking & Validation 🔒**: Users are required to complete each step before proceeding to the next, ensuring a complete and valid order. This includes form validation for shipping information.
-   **Dynamic Order Summary 🧾**: A real-time order summary panel that updates totals and discounts as the user modifies their cart, shipping options, or applies coupons.
-   **Multiple Payment Options 💳**: A segmented control allows users to choose between various payment methods, including Credit Card, BNPL, Crypto, and Google Pay.
-   **Google Pay API Integration 💸**: A full-featured integration with the Google Pay for Web API (in a test environment).
    -   Includes a dynamic flow for selecting shipping addresses and options directly within the Google Pay payment sheet.
    -   Supports real-time price updates based on the selected shipping option.
-   **Advanced Animations ✨**: Smooth and intuitive animations powered by Framer Motion enhance the user experience throughout the application.
-   **Centralized Text Management 🌍**: All static text and placeholders are managed in a single constants file for easy maintenance and future internationalization.

## 🛠️ Tech Stack

-   **React 19** with TypeScript
-   **Styled-components** for all styling
-   **Framer Motion** for animations
-   **Lucide React** for icons
-   **date-fns** for date management

---

## How to make custom React TS code work for a DX site

### Take care of your React app styles..

* Take a look at the **[globalStyles.ts](src/styles/GlobalStyle.ts)**. Adding this following rule will protect the app from the DX styles.

```
* {
        box-sizing: content-box;
  }
  ```

#### Also, it's needed that Buttons, Selectors and Pages are always declaring this prop

- ``` box-sizing: border-box;```

### Settings modal

1. Look at the **[dx](src/utils/dx)** folder. That's where the settings modal its allocated. This allows personalization for the driver to choose the preferred story flow.
2. That settings modal it's used in the **[CheckoutPage.tsx](src/components/CheckoutPage/CheckoutPage.tsx)**. Take a look at the way it's used, precisely at the added class.
3. Mandatory file for the Settings modal to show just in edit mode: **[index.css](src/index.css)**
4. In the **[App.tsx](src/App.tsx)** you will be able to see how to detect if localhost and also that we are showing this as a Single App, no Browser Router involved. Yet we did not find a way to use it.

#### How to introduce a new setting

Here is a step-by-step guide to all the changes required to introduce a new setting:

**Hypothetical scenario:** _"Auto Bundle" vs. "Health Bundle" setting._ If auto its elected th total open claims should be in higher number dominated by the Auto, if health bundle, health will dominate.

1. **Update Core Types** `src/utils/dx/types.ts`
    1. Define the new setting's type.
    2. Add the new property to the Settings interface.
2. **Update Centralized Data** `src/utils/dx/dx-data.ts`
    1. Export a constant array for the new setting's options.
    2. Export a constant for the default value.
    3. Update MODAL_DATA with any new UI labels required for the settings modal.
3. **Update the Settings Configuration** `src/utils/dx/settingsConfig.ts`
    1. Create a new, strongly-typed config object for the setting.
    2. Add the new config object to the main settingsConfig export.
4. **Update Settings Context and Modal**
    1. Add the new setting to the defaultSettings object -> `src/utils/dx/settingsContext.tsx`
    2. Update the union type for the value parameter in the existing generic handleSettingChange function to include the new setting's type -> `src/utils/dx/SettingsModal.tsx`
    3. Update the type signature in the FormGroupRenderProps interface and in the onChange handler's type cast to include the new setting's type -> `src/utils/dx/formGroups.tsx`
5. **Make the Component Data Dynamic**
    1. This is the final step where you use the new setting to create a dynamic user experience. Modify the dataAdapter to read the new setting from the settings object and pass it to your data-generating functions. Update components to handle the dynamic data, by updating the business files, **in this case**:

##### File Summary:

* `types.ts` **Defines the "shape" of the data.** It contains only TypeScript type and interface definitions.
* `dx-data.ts` **Provides all static values.** It holds all the constant data, such as labels, default values, and options for the settings.
* `settingsConfig.tsx` **Acts as the central registry.** It imports from the other files to define what settings exist and connects their data to their UI components.
* `settingsContext.tsx` **Manages the application's state.** It handles creating, updating, and persisting the settings to localStorage.
* `formGroups.tsx` **Defines the UI structure.** It generates the form fields that will be displayed inside the settings modal based on the configuration.


### DX config
1. Look at the **[package.json](package.json)** folder. This is proprietary for DX use.
```
  "scripts": {
    {...normal react scripts...}
    "dx-deploy": "npm install && npm run build && dxUsername=wpsadmin dxPassword=wpsadmin npm run dx-deploy-app",
    "dx-deploy-app": "dxclient deploy-scriptapplication push -dxUsername $dxUsername -dxPassword $dxPassword -wcmContentName \"$npm_package_config_dxclient_wcmContentName\" -wcmSiteArea \"$npm_package_config_dxclient_wcmSiteArea\" -mainHtmlFile $npm_package_config_dxclient_mainHtmlFile -contentRoot \"$npm_package_config_dxclient_contentRoot\" -dxProtocol $npm_package_config_dxclient_protocol -hostname $npm_package_config_dxclient_hostname -dxPort $npm_package_config_dxclient_port",
    "dx-deploy-app-win": "dxclient deploy-scriptapplication push -dxUsername %dxUsername% -dxPassword %dxPassword% -wcmContentName \"%npm_package_config_dxclient_wcmContentName%\" -wcmSiteArea \"%npm_package_config_dxclient_wcmSiteArea%\" -mainHtmlFile %npm_package_config_dxclient_mainHtmlFile% -contentRoot \"%npm_package_config_dxclient_contentRoot%\" -dxProtocol %npm_package_config_dxclient_protocol% -hostname %npm_package_config_dxclient_hostname% -dxPort %npm_package_config_dxclient_port%",
    "dx-deploy-app-use-env": "dxclient deploy-scriptapplication push -dxUsername $dxUsername -dxPassword $dxPassword -wcmContentName \"$npm_package_config_dxclient_wcmContentName\" -wcmSiteArea \"$npm_package_config_dxclient_wcmSiteArea\" -mainHtmlFile $npm_package_config_dxclient_mainHtmlFile -contentRoot \"$npm_package_config_dxclient_contentRoot\" -dxProtocol $dxProtocol -hostname $dxHostname -dxPort $dxPort",
    "dx-deploy-app-use-env-win": "dxclient deploy-scriptapplication push -dxUsername %dxUsername% -dxPassword %dxPassword% -wcmContentName \"%npm_package_config_dxclient_wcmContentName%\" -wcmSiteArea \"%npm_package_config_dxclient_wcmSiteArea%\" -mainHtmlFile %npm_package_config_dxclient_mainHtmlFile% -contentRoot \"%npm_package_config_dxclient_contentRoot%\" -dxProtocol %dxProtocol% -hostname %dxHostname% -dxPort %dxPort%"
  },
"config": {
    "dxclient": {
      "wcmContentName": "Checkout",
      "wcmSiteArea": "Script Application Library/Script Portlet Applications",
      "mainHtmlFile": "index.html",
      "contentRoot": "./build",
      "protocol": "https",
      "hostname": "vivre.woodburn.digital",
      "port": "443"
    }
  },
  "homepage": "./",
  "name": "checkout"
```
* Things that has to be changed to suit other DX sites:
    - ```hostname```
    - ```name```
    - ```wcmContentName```

### How to deploy

`npm run dx-deploy`

Coded with ❤️ by Juan Patricio Doyle ✨2025