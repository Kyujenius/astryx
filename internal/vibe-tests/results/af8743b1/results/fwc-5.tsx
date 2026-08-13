import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';

export default function RowActionsMenu() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {['Alice', 'Bob', 'Charlie'].map((name) => (
          <tr key={name}>
            <td>{name}</td>
            <td>Active</td>
            <td>
              <DropdownMenu
                button={{label: 'Actions', variant: 'ghost', isIconOnly: true}}
                hasChevron={false}
                items={[
                  {label: 'Edit', onClick: () => console.log(`Edit ${name}`)},
                  {label: 'Duplicate', onClick: () => console.log(`Duplicate ${name}`)},
                  {type: 'divider'},
                  {label: 'Delete', variant: 'destructive', onClick: () => console.log(`Delete ${name}`)},
                ]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
