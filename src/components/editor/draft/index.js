import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
//
import { toolbarFull, toolbarSimple } from './DraftEditorToolbar';
import DraftEditorStyle from './DraftEditorStyle';

// ----------------------------------------------------------------------

DraftEditor.propTypes = {
  simple: PropTypes.bool,
  sx: PropTypes.object
};

export default function DraftEditor({ simple, sx, ...other }) {
  return (
    <DraftEditorStyle sx={sx}>
      <Editor toolbar={simple ? toolbarSimple : toolbarFull} placeholder="Write something awesome..." {...other} />
    </DraftEditorStyle>
  );
}
