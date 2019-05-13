import React, { StatelessComponent } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { StaggerWrapper, Stagger } from "staggered";
import { NOTE_TYPE_MAP, BaseNote } from "../../components/notes/note-types/module";
import { Link } from "gatsby";

const hasNotesPageLoaded = (pathname) => typeof window !== 'undefined' && (window.location.pathname !== pathname) && (window as any).__NOTES_LAYOUT_LOADED;

const Template: StatelessComponent<{ location: any, pageContext: { note: BaseNote<any> } }> = ({ location, pageContext: { note } }) => {

  const Detailed = NOTE_TYPE_MAP[note.type].detail;
  const Note = (props) => <Detailed {...props} {...note} />

  const PreloadedLayout = (
    <Layout location={location}>
      <SEO
        title={'Notes: ' + note.title}
        keywords={[
          `notes`,
          `javascript`,
          `typescript`,
          `programming`,
          "bennetthardwick",
        ]}
      />

      <header>
        <StaggerWrapper>
          <Stagger staggerId="notes">
            <h1>{ note.title }</h1>
          </Stagger>
          <Stagger staggerId="about-notes">
            <p>This is a note titled "{ note.name }" taken from my note Library. <Link to={'/notes/'}>Return to Library.</Link>
            </p>
          </Stagger>
          <Stagger staggerId="stuff">
            <Note modal={false} />
          </Stagger>
        </StaggerWrapper>
      </header>
    </Layout>
  )

  const ModalLayout = <Note modal={true} />

  return hasNotesPageLoaded(location.pathname) ? ModalLayout : PreloadedLayout;

}



export default Template;