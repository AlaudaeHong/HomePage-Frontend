import { Component } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


class StaticMarkDown extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      content: ""
    }
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + this.props.filePath)
      .then((r) => r.text())
      .then((text) => this.setState({ content: text }));
  }

  render() {
    return <>
      <ReactMarkdown children={this.state.content} remarkPlugins={[remarkGfm]} />
    </>
  }
}

export default StaticMarkDown;