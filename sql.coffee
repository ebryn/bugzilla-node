module.exports =
  bugs:
    find:
      """
      SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product,
      c.name component, version, rep_platform platform, op_sys, priority, bug_severity severity,
      assigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time
      FROM bugs b
      LEFT JOIN products p ON b.product_id = p.id
      LEFT JOIN components c ON b.component_id = c.id
      WHERE bug_id = ?
      """
    findAll:
      """
      SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product,
      c.name component, version, rep_platform platform, op_sys, priority, bug_severity severity,
      assigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time
      FROM bugs b
      LEFT JOIN products p ON b.product_id = p.id
      LEFT JOIN components c ON b.component_id = c.id
      ORDER BY bug_id DESC LIMIT 10000
      """