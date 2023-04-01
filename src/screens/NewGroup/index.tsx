import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subtitle="crie uma turma para adicionar as pessoas" />
        <Input placeholder="Nome da turma" />
        <Button text="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
