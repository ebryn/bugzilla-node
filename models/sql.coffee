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
    findDependentBugIds:
      """
      SELECT dependson id
      FROM dependencies
      WHERE blocked = ?
      ORDER BY dependson
      """
    findBlockingBugIds:
      """
      SELECT blocked id
      FROM dependencies
      WHERE dependson = ?
      ORDER BY blocked
      """

  comments:
    find:
      """
      SELECT comment_id id, bug_id, thetext text, p.realname creator, bug_when created_at, isprivate is_private
      FROM longdescs ld
      LEFT JOIN profiles p ON ld.who = p.userid
      WHERE comment_id = ?
      """

    findAll:
      """
      SELECT comment_id id, bug_id, thetext text, p.realname creator, bug_when created_at, isprivate is_private
      FROM longdescs ld
      LEFT JOIN profiles p ON ld.who = p.userid
      WHERE bug_id = ?
      ORDER BY comment_id
      """

    findIds:
      """
      SELECT comment_id id
      FROM longdescs ld
      WHERE bug_id = ?
      ORDER BY comment_id
      """

  attachments:
    findIds:
      """
      SELECT attach_id id
      FROM attachments a
      WHERE bug_id = ? AND isobsolete = 0
      ORDER BY attach_id
      """