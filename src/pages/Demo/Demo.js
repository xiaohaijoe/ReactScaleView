import { ScaleView } from "../../components";

const { ScaleViewContainer, ScaleViewItem } = ScaleView;
const Demo = () => {
  return (
    <ScaleViewContainer
      config={{
        width: 1920,
        height: 1080,
        scaleType: "FULL_SCREEN",
      }}
    >
      {/* <ScaleViewItem></ScaleViewItem> */}
    </ScaleViewContainer>
  );
};
export default Demo;
