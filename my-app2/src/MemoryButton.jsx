import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// export default function TextButtons({ label, onClick, sx }) {
//   return (
//     <Stack direction="row" spacing={2} onClick={onClick} sx={sx}>
//       {label}
//     </Stack>
//   );
// }

export default function TextButtons({ label, onClick, sx }) {
  return (
    // <Stack direction="row">
    <Button spacing={2} onClick={onClick} sx={sx} variant="contained">
      {label}
    </Button>
    // </Stack>
  );
}
