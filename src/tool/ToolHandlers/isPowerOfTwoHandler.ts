import isPowerOfTwo from "../../algorithm/Math/is-power-of-two/isPowerOfTwo";
import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse } from "./handlers";

export const isPowerOfTwoHandler = async (
  args: Record<string, unknown> | undefined
) => {
  const validatedArgs = ToolSchemas[ToolName.IS_POWER_OF_TWO].parse(args);
  const { number } = validatedArgs;

  return createResponse(isPowerOfTwo(number).toString());
};
