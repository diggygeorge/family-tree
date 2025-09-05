import React, { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";

const FamilyTree = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const data = [
        { id: '1', name: 'Danny', parents: ['2', '3'] },
        { id: '2', name: 'Mother of Danny' },
        { id: '3', name: 'Father of Danny' },
        { id: '4', name: 'Ex-Wife', exSpouse: '1' },
        { id: '5', name: 'New Wife', spouse: '1' },
        { id: '6', name: 'Child of Danny', parents: ['1', '5'] },
      ];

      const chart = new OrgChart()
        .container(d3Container.current) // Attach chart to the ref
        .data(data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 100)
        .childrenMargin((d) => 40)
        .compact(false)
        .nodeContent((d) => {
          return `
            <div style="padding:10px; border-radius:8px; background:${
              d.data.exSpouse ? "#ffcccc" : d.data.spouse ? "#ccffcc" : "#eeeeee"
            }; width:180px; height:80px; display:flex; align-items:center; justify-content:center;">
              <strong>${d.data.name}</strong>
              ${d.data.spouse ? "<br/>(Spouse)" : ""}
              ${d.data.exSpouse ? "<br/>(Ex)" : ""}
            </div>
          `;
        });

      chart.render();
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Family Tree</h2>
      <div ref={d3Container} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default FamilyTree;
