import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';

export default function RowActionsMenu() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-3 font-medium">Name</th>
            <th className="text-left p-3 font-medium">Status</th>
            <th className="text-right p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {['Alice', 'Bob', 'Charlie'].map((name) => (
            <tr key={name} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3">{name}</td>
              <td className="p-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
              </td>
              <td className="p-3 text-right">
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
    </div>
  );
}
