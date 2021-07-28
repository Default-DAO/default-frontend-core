import { builder, BuilderComponent } from '@builder.io/react'

builder.init(process.env.BUILDERIO_API_KEY)

const Voting = (props) => (
  <BuilderComponent
    content={props.content}
    model="page" />
)

export default Voting;

Voting.getInitialProps = async ({pathname}) => {
  const content = await builder.get('page', { url: pathname }).promise();
  return {
    content,
  }
}