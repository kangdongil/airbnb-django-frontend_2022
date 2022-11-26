## 0.0 Create-React-App(CRA) Configuration
- NodeJS 최신화
  - `nvm install --lts`
- CRA + TypeScript + Chakra.UI
    - `npx create-react-app . --template @chakra-ui/typescript`
- React-Router-Dom
    - `npm i react-router-dom`
- TanStack-Query
    - `npm i @tanstack/react-query axios @tanstack/react-query-devtools`

### 0.1 React 기초 지식
- Component
- JSX
- Prop

### 0.2 TypeScript + React
- Interface

## 1.0 Create-React-App
### 1.1 CRA 프로젝트를 Optimize하기
1. `src/`
  - `index/tsx` / `App.tsx` / `react-app-env.d.ts` 제외하고 모두 지워주기
### 1.2 Component 폴더 구조로 관리하기
  - `src/components`
    - 재사용을 염두하고 만든 component들
    - `Root.tsx`도 여기에 포함된다
  - `src/routes`
    - 특정 route에만 사용되는 component들
## 2.0 React-Router-Dom
### 2.1 createBrowserRouter로 Route 관리하기
1. `<App />` 대신 `<RouterProvider router={router} />`를 만든다
2. `./`에 `router.tsx`를 만든 후, `createBrowserRouter`를 선언해 router 변수에 넣어 `export default`한다.
  - `createBrowserRouter`는 `path`을 마치 `json`구조로 작성하는 경험을 제공한다
  ```javascript
  // index.tsx
  import { RouterProvider } from "react-router-dom";

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )

  // router.tsx
  import { createBrowserRouter } from "react-router-dom";

  const router = createBrowserRouter([
    {[PATH]},
    ...
  ]}

  export default router;
  ```
3. `[PATH]`는 기본적으로 url인 `path`와 container인 `element`를 가진다
  ```javascript
  {
    path: "/",
    element: <Root />,
  }
  ```
  - `<Root />`를 extend하는 page를 만들고 싶다면 `children`에 해당되는 `path`를 만들어준다
  - `children`은 `<Outlet />`에서 구현된다
  ```javascript
  //router.tsx
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, ...
    ]
  }

  //Root.tsx
  import { Outlet } from "react-router-dom";

  export const function Root() {
    return(
      <Box>
        ...
        <Outlet />
      </Box>
    );
  }
  ```
  - `404`처리를 하고싶다면 `errorElement`을 지정해준다
  ```javascript
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [ ~ ],
    ...
  }
  ```
### 2.2 `<Link>`로 링크하기
- `<a href="~">`는 React가 다시 Reload되므로 `<Link to="~">`를 사용한다
  ```javascript
  import { Link } from "react-router-dom";

  <Link to="~">
    ...
  </Link>
  ```
## 3.0 chakra-ui
### 3.1 chakra-ui 적용하기
- `<ChakraProvider>`를 최상위 component를 감싼다
  ```javascript
  import { ChakraProvider } from "@chakra-ui/react";
  ...
  <ChakraProvider>
    <App />
  </ChakraProvider>

  ```
### 3.1.1 react-icons
- `npm i react-icons --save`
- react-icons 사용하기
  ```javascript
  import { FaAirbnb } from "react-icons/fa";
  ...
  <FaAirbnb />
  ```
- icon에 color를 주려면 `<Box>`로 씌워준 뒤 Box에 color를 준다
  ```javascript
  <Box color="red.500">
    <FaAirbnb size={"48"}>
  </Box>
  ```

### 3.2 chakra-ui Component 알아보기
#### 3.2.0 Unit 관련
- `rem`: 1rem은 16px과 같다(=4)
  - 16px인 spacing: `spacing={2}`
  - 48px인 fontsize: `size={"48"}`
#### 3.2.1 Data Display 관련
- `<Divider />`: HTML <hr />과 유사함.
#### 3.2.2 Layout 관련 Component
- `<Box>`
  - HTML `<div>`와 같다. 모든 Component와 공통되는 속성을 가진다.
  - `w`(=`width`) / `h`(=`height`)
  - `minW`(=`minWidth`) / `minH`(=`minHeight`)
  - `p`(padding) / `px` / `py`
  - `border`
    - `borderBottom`
    - `borderBottomWidth`
  - flex
    - `justify`(=`justifyContent`)
    - `align`(=`alignItems`)
    - `direction`(=`flexDirection`)
- `<Stack>` / `<VStack>` / `<HStack>`
  - `flex-direction`이 적용된 `Stack`
  - Stack 안 Element들간에는 여백이 기본으로 적용되어있다
  - ResponsiveDesign으로 인해 flex-direction이 바뀐다면 그냥 `<Stack>`을 사용한다
  - `spacing`
- `<Grid>`
  - `display: grid`한 `<div>`이다
  - `templateColumns`
    - 직접 지정해주거나,(`"5fr 1fr"`)
    - repeact를 활용한다 (`"repeact(5, 1fr)"`)
#### 3.2.3 Form 관련 Component
- Element의 형태와 관련된 Component
- `<Button>`
  - `variant`: Button 스타일
    - `solid` / `outline` / `ghost` / `link`
  - `colorScheme`: Button 색조
  - `size`: Button 크기
  - `leftIcon`: 왼쪽 아이콘 삽입
  - `isLoading`
    - `loadingText`
- `<IconButton>`
  - `<Button>`은 상속받음
  - `icon`: 사용할 Icon Component
  - `aria-label`: ScreenReader 사용자를 위한 내용
- `<Input>`
  - HTML <input> prop을 그대로 가짐.
    - `placeholder`
  ```javascript
  <InputGroup>
    <InputLeftElement children={
      <Box color="gray.500">
        <FaUser />
      </Box>
    }>
    <Input
      variant={"filled"}
      placeholder="username"
    />
  </InputGroup>
  ```
- `<InputGroup>`
  - 특정 Input관련된 Container들을 묶는 역할.
- `<InputLeftElement>`
  - `children`: Input 좌측에 들어갈 Element로 보통 Icon이다
#### 3.2.4 Overlay 관련 Component
- 브라우저 화면을 차지하는 요소와 관련된 Component
- `<Modal>`

##### 3.2.4.1 Modal
- `<Modal>`
  - `isOpen`: Modal의 초기상태. `True` / `False`
  - `onClose`: Modal을 close하는 function
  - `motionPreset`: Modal Animation 방식(기본값: `scale`)
- `useDisclosure();`
  - modal의 state를 변경해주는 function을 제공함.
  ```javascript
    import { useDisclosure } from '@chakra-ui/react';

    const { isOpen, onClose, onOpen } = useDisclosure();
    ...
  ```
  - 여러 Modal을 사용하는 경우, 각 함수 이름을 다르게 선언한다.
  ```javascript
    const { isOpen: isLoginOpen, onClose:onLoginClose,
      onOpen: onLoginOpen } = useDisclosure();
  ```
- `<ModalOverlay>`: Modal을 부각시키도록 주변부를 어둡게 함
- `<ModalContent>`: Modal의 Body
- `<ModalHeader>`: Modal의 Header
- `<ModalFooter>`: Modal의 Footer
- `<ModalCloseButton>`: Modal 우상측의 종료버튼
#### 3.2.5 기타 Component
- `<Image>`
  - HTML `<img>` prop을 그대로 가짐. 



### 3.3 Chakra.ui Dark Mode 적용하기
1. `src/`에 `theme.ts` 만들기
  - 기존 theme에 `initialColorMode`와 `useSystemColorMode` 설정값을 `extendTheme`하여 넣는다.
    - `initialColorMode`에서 설정한 값은 브라우저의 `LocalStorage`에 저장된다
    - `light` / `dark` / `system`
  ```javascript
    import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

    const config:ThemeConfig = {
      initialColorMode: "light",
      useSystemColorMode: false,
    };

    const thee = extendTheme({ config });

    export default theme;
  ```
2. `ChakraProvider`에 `theme`을 prop으로 넘긴다
  ```javascript
  import theme from "./theme";

  <ChakraProvider theme={theme}>
  ```
3. client가 마지막으로 한 ColorMode을 설정을 `<ColorModeScript>`로 불러온다.
  ```javascript
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}> />
  ```
4. `colorMode`를 바꾸려면 `toggleColorMode`을 실행한다
  ```javascript
  const { toggleColorMode } = useColorMode();

  <IconButton
    onClick={toggleColorMode}
    ...
  />
  ```
5. `colorMode`에 따라 element가 바뀌길 원한다면 `colorMode`를 조건으로 두거나 `useColorModeValue`에 두가지 상태를 설명한다.
  - `colorMode`를 조건으로 두기
  ```javascript
  const { colorMode } = useColorMode();

  icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
  ```
  - `useColorModeValue`로 `colorMode`에 따른 element 변화주기
  ```javascript
  const logoColor = useColorModeValue([LIGHT_MODE], [DARK_MODE]);
  
  <Box color={logoColor}>
  ...
  ```
  - `Component`를 `useColorModeValue`를 사용하는 경우 다음과 같이 작성한다.
    - 변수명은 대문자로 시작해야 한다
    - 컴포넌트는 태그 없이 이름을 적는다
  ```javascript
  const Icon = useColorModeValue(FaMoon, FaSun);
  ```

### 3.4 Chakra.ui Responsive Design 적용하기
- 특정 Element를 반응형으로 다루고 싶다면, `{{}}` 안에 size마다 값을 어떻게 다루고 싶은지 표현한다
  ```javascript
    spacing={{
      base: ~,
      sm: ~,
      md: ~,
      xl: ~,
      "2xl": ~,
    }}
  ```

### 20.4 CSRF
`npm i js-cookie && npm i @types/js-cookie -D`