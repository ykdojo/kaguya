import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(
  () => import('swagger-ui-react'),
  { ssr: false }
);

export default function ApiDoc() {
  return <SwaggerUI url='/openapi.yaml' />
}