import { Theme } from '@mui/material'
import { ProvisionOption } from './ProvisionData'

export function getStyles(
  provisionOption: ProvisionOption,
  personName: ProvisionOption[],
  theme: Theme,
) {
  return {
    fontWeight:
      personName.indexOf(provisionOption) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
