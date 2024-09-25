const express = require("express");
const conn = require("../config/dbConfig.js");
const { runQuery, runQueryWithParam, uploadFile } = require("./helper.js");

exports.getEduData = async (req, resp) => {
  try {
    const { LoginId } = req.body;
    console.log(req.body);

    const getEducation = `select * from education_details where EmployeeID=?`;
    const resGetEducation = await runQueryWithParam(getEducation, [LoginId]);
    if (resGetEducation.length > 0) {
      resp.send({ data: resGetEducation, status: true });
    } else {
      resp.send({ msg: "Data not found !!", status: false });
    }
  } catch (error) {
    resp.status(400).send({ msg: error, status: false });
  }
};


exports.exitMailEmpforDues = async (req, resp) => {
  try {
    const getData = `select t1.EmployeeID, dol, rsnofleaving, hrcmt, optcmt, disposition, rejoin_status, t1.createdon, t1.createdby,t2.dateofjoin, DATEDIFF(CAST(dol AS DATE), t2.dateofjoin) AS tenure_days from exit_emp t1 join employee_map t2 on t1.EmployeeID=t2.EmployeeID where disposition in ('RES','TER','IR') and  CAST(dol as date) = DATE_SUB(CURDATE(), INTERVAL 3 DAY) `;
    const resGetData = await runQuery(getData);
    if (resGetData.length > 0) {
      resGetData.forEach(async (exitVal) => {
        // console.log(exitVal);
        let tenureContent;
        if (exitVal.tenure_days <= 90) {
          tenureContent = ".";
        } else {
          tenureContent =
            " and will not be able to release your experience letter.";
        }

        const EmployeeID = exitVal.EmployeeID;
        const disposition = exitVal.disposition;

        const sqlFnf = `select EmployeeID,doc_type,doc_stype from doc_details where EmployeeID=? and doc_type='FnF' and doc_stype in ('No Dues Form', 'FNF Consent','FNF Settlement Form')`;
        const resSqlFnf = await runQueryWithParam(sqlFnf, [EmployeeID]);

        const sqlContact = `select t1.EmployeeID,t2.EmployeeName,emailid,t1.dateofjoin from employee_map t1 join personal_details t2 on t1.EmployeeID=t2.EmployeeID join contact_details t3 on t1.EmployeeID=t3.EmployeeID where t1.EmployeeID=?`;
        const resSqlContact = await runQueryWithParam(sqlContact, [EmployeeID]);
        if (resSqlContact.length > 0) {
          //   console.log(resSqlContact);
          let EmployeeName = resSqlContact[0].EmployeeName;
          let emailid = resSqlContact[0].emailid;
        }

        // Array of document types
        const documentTypes = ["No Dues Form","FNF Consent","FNF Settlement Form"];
        // Array to hold employee documents
        const employeeDocuments = [];

        if (resSqlFnf.length > 0) {
          resSqlFnf.forEach((value) => {
            if (value.doc_stype) {
              employeeDocuments.push(value.doc_stype);
            }
          });

          // Find missing documents
          const missingDocs = documentTypes.filter(
            (doc) => !employeeDocuments.includes(doc)
          );
          let missingDocsData = 0;

          if (missingDocs.length === 0) {
            console.log(
              `All required documents are present for Employee ID: ${EmployeeID}`
            );
            missingDocsData = 1;
          } else {
            console.log(
              `Missing documents for Employee ID: ${EmployeeID}: ${missingDocs.join(
                ", "
              )}`
            );
            missingDocsData = 0;
          }

          if (missingDocsData === 0) {
            if (disposition === "TER" || disposition == "IR") {
              const sqltWarn =
                "SELECT ah_subtype, hr_status, `Termination Date` FROM warning_rth WHERE EmployeeID=? AND CAST(`Termination Date` AS DATE) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()";
              const resSqltWarn = await runQueryWithParam(sqltWarn, [
                EmployeeID,
              ]);
              console.log(resSqltWarn);
            }
          }
        }
      });
    }
  } catch (error) {}
};


exports.expenseInsertDatas = async(req, resp) => {
  try {
    if (employeeID && fileNameFinal) {

      const data = {
        EmployeeID: employeeID,
        date,
        amount,
        receipt_no,
        receipt_image: fileNameFinal,
        remarks,
        req_status: 'Pending',
        reqType,
        empName,
        reviewerStatus: 'Pending',
        approverStatus: 'Pending',
        base_loc: baselocation,
        mgrStatus: 'Pending',
        source: 'App',
        category,
        subcategory,
      };

      const query = `INSERT INTO expense_${reqType.toLowerCase()} (${Object.keys(data).join(',')}) VALUES (${Object.values(data).map(val => `'${val}'`).join(',')})`;

      db.query(query, (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Database insertion failed", status: 0 });
        }
        return res.status(200).json({ msg: "Request raised successfully", status: 1 });
      });
    } else {
        return res.status(400).json({ msg: "Invalid request or file not uploaded", status: 0 });
    }

    
  } catch (error) {
    resp.status(400).send({ msg : error, status:false });
  }

}
