import React from "react";
import { useIntl, FormattedMessage } from "react-intl";

const Index = (props: any) => {
  const intl = useIntl();
  return (
    <div>
      {intl.formatMessage({ id: "menu.home" })}
      <FormattedMessage id="menu.home" />
    </div>
  );
};
// export default Index;
export default Index;
