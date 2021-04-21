import { DefineComponent, Plugin } from 'vue'
import GlitchedWriterClass, {
	ConstructorOptions,
	Callback,
	WriterDataResponse,
} from 'node_modules/glitched-writer'

declare const GlitchedWriter: DefineComponent<{}, {}, any> & {
	install: Exclude<Plugin['install'], undefined>
}
export default GlitchedWriter

export {
	GlitchedWriterClass as GlitchedWriter,
	ConstructorOptions,
	Callback,
	WriterDataResponse,
}