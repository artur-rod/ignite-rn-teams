import { Container, Icon, Subtitle, Title } from "./styles";

type Props = {
  title?: string;
  showIcon?: boolean;
  message: string;
};

export function EmptyList({ title, message, showIcon }: Props) {
  return (
    <Container>
      {showIcon && <Icon />}

      {title &&
        <Title>
          {title}
        </Title>}

      <Subtitle>
        {message}
      </Subtitle>
    </Container>
  );
}
