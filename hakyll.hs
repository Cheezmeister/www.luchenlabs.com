module Main where

import Text.Hakyll 
import Text.Hakyll.Render
import Text.Hakyll.Context
import Text.Hakyll.CreateContext 
import Text.Hakyll.File (getRecursiveContents, directory, havingExtension, sortByBaseName)
import Text.Hakyll.CreateContext (createPage, createCustomPage, createListing)
import Text.Hakyll.Regex (matchesRegex)
import Data.List (sort)
import Control.Monad (forM_, liftM)
import Control.Monad.Reader (liftIO)
import Data.Either (Either(..))


-- main = hakyll "http://luchenlabs.com" $ do

theconfig :: HakyllConfiguration
theconfig = (defaultHakyllConfiguration "http://luchenlabs.com")

main = hakyll $ do
    -- Static directories.
    directory css "css"
    directory static "content"

    -- Render index
    renderChain [
        "index.markdown", 
        "templates/header.html", 
        "templates/default.html"] . withFooter $
            createListing "index.html" ["templates/projectrow.html"]
            [
            create "spheres",
            create "chromathud",
            create "cheezus"
            ] []

            `combine` createPage "index.markdown"


    -- Render main project page
    renderChain [
		"projects/projects.markdown", 
		"templates/header.html", 
		"templates/default.html"] . withFooter $ 

		-- Create project list
		createListing "projects/index.html" ["templates/projectrow.html"] 
		[create "spheres",
		create "gsoc",
		create "chromathud",
		create "raytracer",
		create "cheezus",
		create "nextris"] []

		`combine` createPage "projects/projects.markdown"


    --directory renderOrRecurse "projects"

    renderProjectPage "gsoc"
    renderProjectPage "spheres"
    renderProjectPage "chromathud"
    renderProjectPage "raytracer"
    renderProjectPage "cheezus"
    renderProjectPage "nextris"

--    renderSTD "index.markdown"
    renderSTD "bio.markdown"
    renderSTD "faq.markdown"
    renderSTD "contact.rst"

    directory renderSTD "resume"

    renderOrRecurse "personal"

    renderOrRecurseWithFunc renderWithJS "tidbits"

    where
        renderOrRecurse = renderOrRecurseWithFunc renderSTD
        renderOrRecurseWithFunc func path
            | path `matchesRegex` "rst|markdown|html" = func path
            | path `matchesRegex` "txt|perl|zip|gz|tgz|7z|js|c" = static path
            | otherwise = directory (renderOrRecurseWithFunc func) path

        renderWithJS path
	    | path `matchesRegex` "html" = static path
	    | otherwise = renderChain ["templates/header.html", "templates/defaultwithjs.html"]
	    . withFooter . createPage $ path

        renderSTD path
	    | path `matchesRegex` "html|pdf" = static path
	    | otherwise = renderChain ["templates/header.html", "templates/default.html"] 
            . withFooter . createPage $ path

        withHeader = combine $ createPage "templates/header.html"

        withFooter = flip combine $ createPage "footer.markdown"

        combineAll (page:[]) = create page
        combineAll (page:rest) = combine (create page) $ combineAll rest

        create page = combineWithUrl (page ++ "/index.markdown") 
            (createPage $ "projects/" ++ page ++ "/index.markdown") 
            (createCustomPage "temp" [])

        renderProjectPage page = renderChain 
            ["templates/projectpage.html", "templates/header.html", "templates/default.html"] 
            . withFooter . createPage $ 
            "projects/" ++ page ++ "/index.markdown"
