export interface ProvisionOption {
  readonly value: string
  readonly label: string
}

export const provisionOptions: ProvisionOption[] = [
  { value: 'Shelter', label: 'Shelter' },
  { value: 'Food', label: 'Food' },
  { value: 'Sanitary Items', label: 'Sanitary Items' },
  { value: 'Groceries', label: 'Groceries' },
]
