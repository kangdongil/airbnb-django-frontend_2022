## 0.0 Create-React-App(CRA) Configuration
- NodeJS 최신화
  - `nvm install --lts`
- CRA + TypeScript + Chakra.UI
    - `npx create-react-app . --template @chakra-ui/typescript`
- React-Router-Dom
    - `npm i react-router-dom`
- TanStack-Query
    - `npm i @tanstack/react-query axios @tanstack/react-query-devtools`

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
#### 3.2.1 Layout 관련 Component
- `<Box>`
  - `w`(=`width`) / `h`(=`height`)
  - `minW`(=`minWidth`) / `minH`(=`minHeight`)
  - `p`(padding) / `px` / `py`
  - `border`
    - `borderBottom`
    - `borderBottomWidth`
  - flex
    - `justify`(=`justifyContent`)
    - `align`(=`alignItems`)
- `<VStack>` / `<HStack>`
  - `spacing`
#### 3.2.2 Form 관련 Component
- Element의 형태와 관련된 Component
- `<Button>`
  - `variant`: Button 스타일
  - `colorScheme`: Button 색조
  - `size`: Button 크기
  - `leftIcon`: 왼쪽 아이콘 삽입
  - `isLoading`
    - `loadingText`