import React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

function getStyles(name: string, volunteerProvisions: readonly string[], theme: Theme) {
  return {
    fontWeight:
      volunteerProvisions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

// eslint-disable-next-line
function DropDown(props: any) {
  const { volunteerProvisions, setVolunteerProvisions } = props.props
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<typeof volunteerProvisions>) => {
    const {
      target: { value },
    } = event
    setVolunteerProvisions(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
  const handleDelete = (value: string) => {
    setVolunteerProvisions(volunteerProvisions.filter((e: any) => e != value)) // eslint-disable-line
  }
  return (
    <Box style={{ paddingTop: '15px' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-multiple-chip-label'>Tags</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={volunteerProvisions}
          label='Tags'
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(
                (
                  value: any, // eslint-disable-line
                ) => (
                  <Chip
                    key={value}
                    label={value}
                    deleteIcon={
                      <ClearTwoToneIcon onMouseDown={(event) => event.stopPropagation()} />
                    }
                    onDelete={() => handleDelete(value)}
                  />
                ),
              )}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, volunteerProvisions, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default DropDown
