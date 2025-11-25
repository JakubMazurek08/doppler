import { ProtectedRoute } from '@/shared/components/auth/ProtectedRoute';
import { Button } from '@/shared/components/ui/button';

export default function Home() {
  return (
    <ProtectedRoute>
      <>
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <h4>Header 4</h4>
        <p>
          Paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in quam ligula. Cras massa ligula,
          pulvinar pulvinar metus placerat, pulvinar fermentum mauris. Integer molestie est augue, non efficitur neque
        </p>
        <small>
          Small text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in quam ligula. Cras massa ligula,
          pulvinar pulvinar metus placerat, pulvinar fermentum mauris. Integer molestie est augue, non efficitur neque
        </small>

        <br></br>
        <Button variant={'ghost'}> Click me! </Button>
        <Button variant={'outline'}> Click me! </Button>
        <Button variant={'secondary'}> Click me! </Button>

        <Button> Click me! </Button>
      </>
    </ProtectedRoute>
  );
}
