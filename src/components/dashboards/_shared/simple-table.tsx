import type { ReactNode } from "react";

type Column<T> = {
  /**
   * Optional unique identifier for React rendering.
   * Useful when you want to render multiple columns using the same `key`.
   */
  id?: string;
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type SimpleTableProps<T extends Record<string, unknown>> = {
  columns: Array<Column<T>>;
  rows: T[];
};

export default function SimpleTable<T extends Record<string, unknown>>({
  columns,
  rows,
}: SimpleTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-foreground/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-foreground/5">
          <tr>
            {columns.map((c) => (
              <th
                key={c.id ?? String(c.key)}
                className={`whitespace-nowrap px-4 py-3 font-medium ${c.className ?? ""}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-background">
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className="border-t border-foreground/10 transition-colors hover:bg-foreground/5"
            >
              {columns.map((c) => {
                const value = row[c.key];
                return (
                  <td
                    key={c.id ?? String(c.key)}
                    className={`whitespace-nowrap px-4 py-3 text-foreground/80 ${c.className ?? ""}`}
                  >
                    {c.render
                      ? c.render(value, row)
                      : typeof value === "string"
                        ? value
                        : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
