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

## 2.0 React-Router-Dom

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

### 3.2 chakra-ui Component 알아보기
#### 3.2.1 Layout 관련 Component
- VStack / HStack
#### 3.2.2 Form 관련 Component
- `Button`
  - `variant`: Button 스타일
  - `colorScheme`: Button 색조
  - `size`: Button 크기
  - `leftIcon`: 왼쪽 아이콘 삽입
  - `isLoading`
    - `loadingText`
- `Input`
