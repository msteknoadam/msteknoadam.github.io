import React from "react";
import styled from "styled-components";

export default styled.input<{ width?: string }>`
	width: ${(p) => p.width || "25px"};
`;
