import React from 'react'
import cx from 'classnames'
import HelpLink from './help-link'
import './snapshot.css'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool,
  snapshot: PropTypes.object.isRequired,
  onSnapshotToggle: PropTypes.func.isRequired
}

function Snapshot ({ snapshot, index, isExpanded, onSnapshotToggle }) {
  function renderSnapshotContent (snapshot) {
    if (snapshot.highlightedContentHTML) {
      const innerHTML = { __html: snapshot.highlightedContentHTML }
      return <div className="snapshot__content" dangerouslySetInnerHTML={innerHTML}></div>
    } else {
      return <pre className="snapshot__content">{snapshot.content}</pre>
    }
  }

  const pluginLabel = snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially'
  const url_link = `https://www.npmjs.com/package/${snapshot.prevPlugin}`
  const url = (!snapshot.prevPlugin) ? '' : <a className="snapshot__helper" target="_blank" href={url_link} >?</a>
  const benchmark = index > 0
    ? <div className="snapshot__helper_block">{url}<span className="snapshot__timing">{snapshot.timeDiff} ms</span></div>
    : null

  return (
    <li className={cx('selectable ', isExpanded && 'selected')}>
      <h3 className="snapshot__heading clickable" onClick={() => onSnapshotToggle(index)}>
        <img className="icon_heading" src="./assets/triangle_bot.svg" />
        <span className="snapshot__after-plugin">{pluginLabel}</span>
        {index > 0 ? benchmark : null}
      </h3>
      {renderSnapshotContent(snapshot)}
    </li>
  )
}

Snapshot.propTypes = propTypes

export default Snapshot
